import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <h3>egweg</h3>
      {children}
    </div>
  );
};

export default layout;
