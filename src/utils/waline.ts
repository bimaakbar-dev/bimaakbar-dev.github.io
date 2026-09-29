// src/utils/waline.ts

export interface WalineReplyUser {
  nick: string;
  link?: string;
}

export interface WalineComment {
  objectId: string;
  nick: string;
  mail: string;
  link: string;
  url: string;
  comment: string;
  orig: string;
  insertedAt: string;
  createdAt: string;
  updatedAt: string;
  /** Unix timestamp (ms) used for display/sorting — separate from the ISO audit fields above. */
  time: number;
  browser?: string;
  os?: string;
  sticky?: boolean;
  like?: number;
  avatar: string;
  children: WalineComment[];
  status?: 'approved' | 'waiting' | 'spam';
  /** Author role, mirrors WalineUser.type for the comment's author. */
  type?: 'administrator';
  /** objectId of the comment's author, used to check delete permission. */
  user_id?: string;
  /** Root comment id for threaded replies. */
  rid?: string;
  /** Who this comment is replying to, when it's a nested reply. */
  reply_user?: WalineReplyUser;
}

export interface WalineUser {
  objectId: string;
  email: string;
  nick: string;
  /** Display name shown in the UI (falls back to nick server-side). */
  display_name: string;
  link?: string;
  avatar: string;
  type?: 'administrator';
}

interface ApiResponse<T = unknown> {
  errno: number;
  errmsg: string;
  data: T;
}

export class WalineClient {
  private serverURL: string;
  private tokenKey = 'waline-token';

  constructor(serverURL: string) {
    this.serverURL = serverURL.replace(/\/$/, '');
  }

  get token(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }

  set token(value: string | null) {
    if (typeof localStorage === 'undefined') return;
    if (value) localStorage.setItem(this.tokenKey, value);
    else localStorage.removeItem(this.tokenKey);
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) ?? {}),
    };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

    const res = await fetch(`${this.serverURL}${path}`, { ...options, headers });
    return res.json();
  }

  async listComments(path: string, page = 1, pageSize = 20) {
    return this.request<{
      page: number;
      totalPages: number;
      pageSize: number;
      count: number;
      data: WalineComment[];
    }>(`/comment?path=${encodeURIComponent(path)}&page=${page}&pageSize=${pageSize}&sortBy=insertedAt_desc`);
  }

  async submitComment(input: {
    comment: string;
    nick: string;
    mail?: string;
    link?: string;
    url: string;
    /** Parent comment id, when replying. */
    pid?: string;
    /** Root comment id of the thread, when replying. */
    rid?: string;
    /** Nickname of the person being replied to. */
    at?: string;
  }) {
    return this.request<WalineComment>('/comment', {
      method: 'POST',
      body: JSON.stringify({ ...input, ua: navigator.userAgent }),
    });
  }

  async deleteComment(objectId: string) {
    return this.request<null>(`/comment/${objectId}`, { method: 'DELETE' });
  }

  /** Partial update of a comment — used for like, sticky, and status changes. */
  async updateComment(
    objectId: string,
    data: { like?: boolean; sticky?: 0 | 1; status?: 'approved' | 'waiting' | 'spam' },
  ) {
    return this.request<WalineComment>(`/comment/${objectId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async likeComment(objectId: string, like: boolean) {
    return this.updateComment(objectId, { like });
  }

  async setSticky(objectId: string, sticky: boolean) {
    return this.updateComment(objectId, { sticky: sticky ? 1 : 0 });
  }

  async register(input: { email: string; password: string; nick: string; url: string }) {
    return this.request<WalineUser>('/user', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async login(email: string, password: string) {
    const res = await this.request<{ token: string; user: WalineUser }>('/token', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.errno === 0 && res.data?.token) this.token = res.data.token;
    return res;
  }

  async getCurrentUser(): Promise<WalineUser | null> {
    if (!this.token) return null;
    try {
      const res = await this.request<WalineUser>('/token', { method: 'GET' });
      return res.errno === 0 ? res.data : null;
    } catch {
      return null;
    }
  }

  async logout() {
    if (this.token) {
      try {
        await this.request<null>('/token', { method: 'DELETE' });
      } catch {}
    }
    this.token = null;
  }
}
