export const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  published: {
    label: "Published",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  under_review: {
    label: "Under Review",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  approved: {
    label: "Approved",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  draft: {
    label: "Draft",
    bg: "bg-zinc-100",
    text: "text-zinc-500",
    dot: "bg-zinc-400",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
  },
  unpublished: {
    label: "Unpublished",
    bg: "bg-zinc-100",
    text: "text-zinc-500",
    dot: "bg-zinc-400",
  },
};

export const levelConfig: Record<string, string> = {
  beginner: "text-teal-600 bg-teal-50",
  intermediate: "text-blue-600 bg-blue-50",
  advanced: "text-purple-600 bg-purple-50",
  all_levels: "text-zinc-600 bg-zinc-100",
};

export type TableColumn = {
  label: string;
  align?: "left" | "center";
};

export const courseTableColumns: TableColumn[] = [
  { label: "#", align: "left" },
  { label: "Course", align: "left" },
  { label: "Instructor", align: "left" },
  { label: "Lectures", align: "center" },
  { label: "Duration", align: "center" },
  { label: "Students", align: "center" },
  { label: "Price", align: "center" },
  { label: "Status", align: "center" },
  { label: "Level", align: "center" },
  { label: "Actions", align: "center" },
];