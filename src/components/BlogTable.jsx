import Link from "next/link";
import React from "react";
import ButtonsAction from "./Admin/Buttons";

const BlogTable = ({ heading, filteredData, publishedBlog, onDeleteClick }) => {
  return (
    <div className="row text-dark">
      <div className="col-lg-11 col-md-10 admin-home">
        <div className="d-flex justify-content-between align-items-center">
          <div className="">
            <h5>{heading}</h5>
          </div>
          <div className="">
            <Link href="/admin/blog/create">
              <button className="btn-blog mr-1">Create &#43;</button>
            </Link>
            {heading === "Published Blogs" ? (
              <Link href="/admin/drafts">
                <button className="btn-blog">View Drafts &rarr;</button>
              </Link>
            ) : (
              <Link href="/admin/blog">
                <button className="btn-blog">
                  View Published Blogs &rarr;
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white">
          <table className="table__style">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Date</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishedBlog
                ? publishedBlog.map((blog, index) => {
                    return (
                      <TableBody
                        key={index}
                        blog={blog}
                        index={index}
                        onDeleteClick={onDeleteClick}
                      />
                    );
                  })
                : filteredData?.map((blog, index) => {
                    return (
                      <TableBody
                        key={index}
                        blog={blog}
                        index={index}
                        onDeleteClick={onDeleteClick}
                      />
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogTable;

const TableBody = ({ blog, index, onDeleteClick, key }) => {
  return (
    <tr key={key}>
      <td>{index + 1}</td>
      <td>{blog.title}</td>
      <td>{/* {blog.postedDate.toDate().toLocaleDateString("en-GB")} */}</td>
      <td>{blog.posterName}</td>
      <td>
        <ButtonsAction
          to={`blog/${blog.id}`}
          onDeleteClick={() => onDeleteClick(blog.id)}
          data={blog.id}
        />
      </td>
    </tr>
  );
};
