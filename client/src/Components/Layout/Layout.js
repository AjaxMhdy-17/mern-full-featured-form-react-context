import React from "react";

const Layout = ({ children, center, form_layout }) => {
  return (
    <div
      className={`${center === true ? `text-center` : null} container py-10`}
    >
      {form_layout === true ? (
        <div className="row">
          <div className="col-md-6 col-lg-4 mx-auto">{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Layout;
