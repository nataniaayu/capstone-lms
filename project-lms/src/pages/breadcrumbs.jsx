import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Define breadcrumb hierarchy and relationships
  const breadcrumbMap = {
    "admin-user": { name: "User" },
    "admin-courses": { name: "Course " },
    "upload-materials": { name: "Upload Materials", parent: "admin-courses" },
    "upload-video": { name: "Upload Video", parent: "admin-courses" },
    "upload-quiz": { name: "Upload Quiz", parent: "admin-courses" },
    "admin-course": { name: "Course Upload" },
    "admin-settings": { name: "Settings" },
    "admin-feedback": { name: "Feedback" },
    "admin-help": { name: "Help" },
  };

  // Function to build the breadcrumb hierarchy
  const buildBreadcrumbs = (pathnames) => {
    let breadcrumbs = [];
    let currentPath = "";

    pathnames.forEach((value) => {
      currentPath = currentPath ? `${currentPath}/${value}` : value;
      const breadcrumb = breadcrumbMap[value];

      if (breadcrumb) {
        breadcrumbs.push({
          path: `/${currentPath}`,
          name: breadcrumb.name,
        });

        // Add parent breadcrumb if it exists
        if (breadcrumb.parent) {
          const parentBreadcrumb = breadcrumbMap[breadcrumb.parent];
          if (
            !breadcrumbs.some((b) => b.name === parentBreadcrumb.name) // Avoid duplicates
          ) {
            breadcrumbs.unshift({
              path: `/${breadcrumb.parent}`,
              name: parentBreadcrumb.name,
            });
          }
        }
      }
    });

    return breadcrumbs;
  };

  // Generate breadcrumbs
  const breadcrumbs = buildBreadcrumbs(pathnames);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
      aria-label="breadcrumb"
      className="bg-gray-100 p-4 rounded-md shadow-md mb-4"
    >
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link to="/admin-user" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            <span className="mx-2 text-gray-400">{">"}</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-gray-900">{breadcrumb.name}</span>
            ) : (
              <Link to={breadcrumb.path} className="text-blue-500 hover:underline">
                {breadcrumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
