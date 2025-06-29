// API service layer for Taday backend integration
const API_BASE_URL = "https://taday-api.fly.dev";

// Types for API responses
export interface ApiUser {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  phone_number: string;
}

export interface ApiTodo {
  id: string;
  user_id: string;
  date: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiEvent {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  title: string;
  description?: string;
  priority: boolean;
  recur_d: boolean;
  recur_w: boolean;
  recur_m: boolean;
  recur_y: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiTag {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface ApiEventTag {
  id: string;
  event_id: string;
  tag_id: string;
  created_at: string;
}

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    credentials: "include", // Include cookies for authentication
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // Handle different response types
    if (response.status === 204) {
      // No content responses (like DELETE)
      return null as T;
    }

    if (response.status === 401) {
      // Unauthorized - try to refresh token
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry the original request
        const retryResponse = await fetch(url, config);
        if (retryResponse.ok) {
          return retryResponse.json();
        }
      }
      throw new ApiError("Authentication failed", 401);
    }

    if (!response.ok) {
      const errorData = await response.text();
      throw new ApiError(
        `API Error: ${response.status}`,
        response.status,
        errorData,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Type assertion for unknown error
    const err = error as Error;
    throw new ApiError(`Network error: ${err.message}`, 0);
  }
}

// Authentication API
export const authApi = {
  async login(email: string, password: string): Promise<ApiUser> {
    return apiRequest<ApiUser>("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async logout(): Promise<void> {
    return apiRequest<void>("/api/logout", {
      method: "POST",
    });
  },

  async refreshToken(): Promise<void> {
    return apiRequest<void>("/api/refresh", {
      method: "POST",
    });
  },

  async revokeToken(): Promise<void> {
    return apiRequest<void>("/api/revoke", {
      method: "POST",
    });
  },
};

// User API
export const userApi = {
  async getUser(): Promise<ApiUser> {
    return apiRequest<ApiUser>("/api/user");
  },

  async createUser(userData: {
    username: string;
    email: string;
    password: string;
    phone_number?: string;
  }): Promise<ApiUser> {
    return apiRequest<ApiUser>("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  async updateUser(userData: {
    username?: string;
    email?: string;
    password?: string;
    phone_number?: string;
  }): Promise<ApiUser> {
    return apiRequest<ApiUser>("/api/user", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  async deleteUser(): Promise<void> {
    return apiRequest<void>("/api/user", {
      method: "DELETE",
    });
  },
};

// Helper function to refresh token
async function refreshToken(): Promise<boolean> {
  try {
    await authApi.refreshToken();
    return true;
  } catch (error) {
    return false;
  }
}

// Todos API
export const todosApi = {
  async getTodos(sort?: "desc"): Promise<ApiTodo[]> {
    const params = sort ? `?sort=${sort}` : "";
    return apiRequest<ApiTodo[]>(`/api/todos${params}`);
  },

  async getTodo(id: string): Promise<ApiTodo> {
    return apiRequest<ApiTodo>(`/api/todos/${id}`);
  },

  async createTodo(todo: {
    date: string;
    title: string;
    description?: string;
  }): Promise<ApiTodo> {
    return apiRequest<ApiTodo>("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    });
  },

  async updateTodo(
    id: string,
    todo: {
      date?: string;
      title?: string;
      description?: string;
    },
  ): Promise<ApiTodo> {
    return apiRequest<ApiTodo>(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });
  },

  async deleteTodo(id: string): Promise<void> {
    return apiRequest<void>(`/api/todos/${id}`, {
      method: "DELETE",
    });
  },
};

// Events API
export const eventsApi = {
  async getEvents(params?: {
    tag?: string;
    range?: "day" | "week" | "month" | "year";
    sort?: "desc";
  }): Promise<ApiEvent[]> {
    const searchParams = new URLSearchParams();
    if (params?.tag) searchParams.append("tag", params.tag);
    if (params?.range) searchParams.append("range", params.range);
    if (params?.sort) searchParams.append("sort", params.sort);

    const queryString = searchParams.toString();
    return apiRequest<ApiEvent[]>(
      `/api/events${queryString ? `?${queryString}` : ""}`,
    );
  },

  async getEvent(id: string): Promise<ApiEvent> {
    return apiRequest<ApiEvent>(`/api/events/${id}`);
  },

  async createEvent(event: {
    start_date: string;
    end_date: string;
    title: string;
    description?: string;
    priority: boolean;
    recur_d: boolean;
    recur_w: boolean;
    recur_m: boolean;
    recur_y: boolean;
  }): Promise<ApiEvent> {
    return apiRequest<ApiEvent>("/api/events", {
      method: "POST",
      body: JSON.stringify(event),
    });
  },

  async updateEvent(
    id: string,
    event: {
      start_date?: string;
      end_date?: string;
      title?: string;
      description?: string;
      priority?: boolean;
      recur_d?: boolean;
      recur_w?: boolean;
      recur_m?: boolean;
      recur_y?: boolean;
    },
  ): Promise<ApiEvent> {
    return apiRequest<ApiEvent>(`/api/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(event),
    });
  },

  async deleteEvent(id: string): Promise<void> {
    return apiRequest<void>(`/api/events/${id}`, {
      method: "DELETE",
    });
  },
};

// Tags API
export const tagsApi = {
  async getTags(): Promise<ApiTag[]> {
    return apiRequest<ApiTag[]>("/api/tags");
  },

  async createTag(tag: { name: string; color: string }): Promise<ApiTag> {
    return apiRequest<ApiTag>("/api/tags", {
      method: "POST",
      body: JSON.stringify(tag),
    });
  },

  async updateTag(
    id: string,
    tag: {
      name?: string;
      color?: string;
    },
  ): Promise<ApiTag> {
    return apiRequest<ApiTag>(`/api/tags/${id}`, {
      method: "PUT",
      body: JSON.stringify(tag),
    });
  },

  async deleteTag(id: string): Promise<void> {
    return apiRequest<void>(`/api/tags/${id}`, {
      method: "DELETE",
    });
  },
};

// Event Tags API
export const eventTagsApi = {
  async getEventTags(eventId: string): Promise<ApiTag[]> {
    return apiRequest<ApiTag[]>(`/api/events/${eventId}/tags`);
  },

  async addTagToEvent(eventId: string, tagId: string): Promise<ApiEventTag> {
    return apiRequest<ApiEventTag>(`/api/events/${eventId}/tags`, {
      method: "POST",
      body: JSON.stringify({ tag_id: tagId }),
    });
  },

  async removeTagFromEvent(eventId: string, tagId: string): Promise<void> {
    return apiRequest<void>(`/api/events/${eventId}/tags/${tagId}`, {
      method: "DELETE",
    });
  },
};
