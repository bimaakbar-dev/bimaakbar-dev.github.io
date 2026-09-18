// src/utils/waline.ts

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
  browser?: string;
  os?: string;
  sticky?: boolean;
  like?: number;
  avatar: string;
  children: WalineComment[];
  status?: 'approved' | 'waiting' | 'spam';
}

export interface WalineUser {
  objectId: string;
  email: string;
  nick: string;
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
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    };
    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

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
    }>(`/comment?path=${encodeURIComponent(path)}&page=${page}&pageSize=${pageSize}&sortBy=insertedAt_desc`);
  }

  async submitComment(input: {
    comment: string;
    nick: string;
    mail?: string;
    link?: string;
    url: string;
    pid?: string;      // parent id, untuk reply
  }) {
    const ua = navigator.userAgent;
    return this.request<WalineComment>('/comment', {
      method: 'POST',
      body: JSON.stringify({ ...input, ua }),
    });
  }

  async deleteComment(objectId: string) {
    return this.request<null>(`/comment/${objectId}`, { method: 'DELETE' });
  }

  // ── Auth ──────────────────────────────────────────
  async login(email: string, password: string) {
    const res = await this.request<{ token: string; user: WalineUser }>('/token', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.errno === 0) this.token = res.data.token;
    return res;
  }

  async register(input: { email: string; password: string; nick: string; url: string }) {
    return this.request<WalineUser>('/register', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async getCurrentUser() {
    if (!this.token) return null;
    const res = await this.request<WalineUser>('/user');
    return res.errno === 0 ? res.data : null;
  }

  async logout() {
    this.token = null;
  }
}