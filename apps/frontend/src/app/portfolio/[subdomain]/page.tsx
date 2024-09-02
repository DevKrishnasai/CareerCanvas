import Link from "next/link";

export default function Portfolio({
  params,
}: {
  params: { subdomain: string };
}) {
  return (
    <div>
      Welcome to {params.subdomain} Portfolio
      <Link href="/contact">common contact</Link>
    </div>
  );
}
