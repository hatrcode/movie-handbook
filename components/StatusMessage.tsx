import { Button } from "@mui/material";
import Link from "next/link";

export function StatusMessage({
  title,
  message,
  actionHref,
  actionLabel,
}: {
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="status-message glass-panel" role="status">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref}>
          <Button size="small" variant="contained" color="primary">
            {actionLabel}
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
