import NavbarWraper from "@/components/navbar/NavbarWraper";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <NavbarWraper>{children}</NavbarWraper>;
};

export default layout;
