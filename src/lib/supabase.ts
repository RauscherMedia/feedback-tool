import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gvnyagjobcxhfwfekjaw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bnlhZ2pvYmN4aGZ3ZmVramF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NDM2MjYsImV4cCI6MjA5MDUxOTYyNn0.x_RodMJNRLSE7N16I1tIYVNq3uQJzzfRfaA11uUkgRQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  name: string;
  slug: string;
  preview_url: string;
  created_at: string;
};

export type Page = {
  id: string;
  project_id: string;
  label: string;
  path: string;
  sort_order: number;
};

export type Feedback = {
  id: string;
  project_id: string;
  page_id: string;
  author: string;
  comment: string;
  category: string;
  status: "open" | "in_progress" | "done";
  pin_x: number | null;
  pin_y: number | null;
  admin_reply: string | null;
  created_at: string;
};

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data as Project;
}

export async function getPages(projectId: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order");
  if (error) throw error;
  return data as Page[];
}

export async function getFeedbacks(projectId: string) {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Feedback[];
}

// DIRECT FETCH — bypasses Supabase JS client entirely
export async function createFeedback(feedback: {
  project_id: string;
  page_id: string;
  author: string;
  comment: string;
  category: string;
  pin_x?: number;
  pin_y?: number;
}) {
  console.log("[FB-DEBUG] createFeedback called with:", JSON.stringify(feedback));

  const response = await fetch(
    supabaseUrl + "/rest/v1/feedbacks",
    {
      method: "POST",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": "Bearer " + supabaseAnonKey,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(feedback),
    }
  );

  console.log("[FB-DEBUG] fetch response:", response.status, response.statusText);

  if (!response.ok) {
    const text = await response.text();
    console.error("[FB-DEBUG] Error body:", text);
    throw new Error("Insert failed: " + response.status + " " + text);
  }

  console.log("[FB-DEBUG] INSERT SUCCESSFUL!");
}

export async function updateFeedbackStatus(id: string, status: string) {
  const { error } = await supabase
    .from("feedbacks")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function updateAdminReply(id: string, reply: string) {
  const { error } = await supabase
    .from("feedbacks")
    .update({ admin_reply: reply })
    .eq("id", id);
  if (error) throw error;
}

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Project[];
}

export async function createProject(project: {
  name: string;
  slug: string;
  preview_url: string;
}) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}
