// src/utils/waline.ts

export interface WalineComment {
  objectId: number;
  time: number;
  comment: string;
  orig: string;
  like: number;
  nick: string;
  link: string;
  avatar: string;
  type?: 'administrator' | 'guest';
  user_id?: number;
  status?: 'approved' | 'waiting' | 'spam';
  sticky?: boolean;
  pid?: number;
  rid?: number;
  at?: string;
  reply_user?: {
    nick: string;
    link: string;
    avatar: string;
  };
  children?: WalineComment[];
}

export interface WalineUser {
  objectId: number;
  display_name: string;
  email: string;
  url: string;
  avatar: string;
  type: 'administrator' | 'guest';
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

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) ?? {}),
    };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

    const res = await fetch(`${this.serverURL}${path}`, { ...options, headers });
    return res.json();
  }

  // ── Comments ──────────────────────────────────────
  async listComments(path: string, page = 1, pageSize = 20) {
    return this.request<{
      page: number;
      totalPages: number;
      pageSize: number;
      count: number;
      data: WalineComment[];
    }>(
      `/comment?path=${encodeURIComponent(path)}&page=${page}&pageSize=${pageSize}&sortBy=insertedAt_desc`,
    );
  }

  async submitComment(input: {
    comment: string;
    nick: string;
    mail?: string;
    link?: string;
    url: string;
    pid?: number;
    rid?: number;
    at?: string;
  }) {
    return this.request<WalineComment>('/comment', {
      method: 'POST',
      body: JSON.stringify({ ...input, ua: navigator.userAgent }),
    });
  }

  async deleteComment(objectId: number) {
    return this.request<null>(`/comment/${objectId}`, { method: 'DELETE' });
  }

  // ── Auth ──────────────────────────────────────────
  // Register: POST /api/user
  async register(input: {
    email: string;
    password: string;
    nick: string;
    url: string;
  }) {
    return this.request<WalineUser>('/user', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  // Login: POST /api/token
  async login(email: string, password: string) {
    const res = await this.request<{ token: string } & WalineUser>('/token', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.errno === 0 && res.data?.token) this.token = res.data.token;
    return res;
  }

  // Get current user: GET /api/token
  async getCurrentUser(): Promise<WalineUser | null> {
    if (!this.token) return null;
    try {
      const res = await this.request<WalineUser>('/token');
      return res.errno === 0 ? res.data : null;
    } catch {
      return null;
    }
  }

  // Logout: DELETE /api/token
  async logout() {
    try {
      await this.request<null>('/token', { method: 'DELETE' });
    } catch {}
    this.token = null;
  }
}