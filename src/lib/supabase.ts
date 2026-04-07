import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ──

export type Project = {
  id: string;
  name: string;
  slug: string;
  preview_url: string;
  client_name: string | null;
  status: "active" | "archived";
  created_at: string;
};

export type Page = {
  id: string;
  project_id: string;
  label: string;
  path: string;
  sort_order: number;
  created_at: string;
};

export type Feedback = {
  id: string;
  project_id: string;
  page_id: string;
  author: string;
  comment: string;
  category: "text" | "design" | "funktion" | "sonstiges";
  status: "open" | "in_progress" | "done";
  pin_x: number | null;
  pin_y: number | null;
  admin_reply: string | null;
  created_at: string;
};

// ── API Functions ──

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    ;
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

export async function createFeedback(feedback: {
  project_id: string;
  page_id: string;
  author: string;
  comment: string;
  category: string;
  pin_x?: number;
  pin_y?: number;
}) {
  const { data, error } = await supabase
    .from("feedbacks")
    .insert(feedback)

    ;
  if (error) throw error;
  return;
}

export async function updateFeedbackStatus(
  id: string,
  status: "open" | "in_progress" | "done"
) {
  const { error } = await supabase
    .from("feedbacks")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function updateFeedbackReply(id: string, admin_reply: string) {
  const { error } = await supabase
    .from("feedbacks")
    .update({ admin_reply })
    .eq("id", id);
  if (error) throw error;
}

// ── Admin Functions ──

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
  client_name?: string;
}) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)

    ;
  if (error) throw error;
  return data as Project;
}
