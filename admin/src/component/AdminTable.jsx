import React from 'react';
import SkeletonLoader from './ui/SkeletonLoader';

const AdminTable = ({ headers, children, className = "", loading = false, emptyMessage = "No data found." }) => {
  const childrenArray = React.Children.toArray(children);
  const theadChild = childrenArray.find(child => child.type === 'thead');
  const otherChildren = childrenArray.filter(child => child.type !== 'thead');

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="admin-table">
        {/* Step 1: Render Header */}
        {theadChild || (headers && (
          <thead>
            <tr className="text-left">
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className="px-6 py-4 text-[10px] font-bold text-[#A1A1A1] uppercase tracking-[2px] font-outfit"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        ))}

        {/* Step 2: Render Body logic */}
        {loading ? (
          <tbody>
            {Array(5).fill(0).map((_, i) => (
              <tr key={i}>
                <td colSpan={headers?.length || 10} className="p-0">
                  <SkeletonLoader variant="table-row" className="mb-0 rounded-none border-x-0 border-t-0" />
                </td>
              </tr>
            ))}
          </tbody>
        ) : otherChildren.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={headers?.length || 10} className="px-6 py-12 text-center text-[#888] font-medium font-outfit uppercase tracking-wider">
                {emptyMessage}
              </td>
            </tr>
          </tbody>
        ) : (
          otherChildren
        )}
      </table>
    </div>
  );
};

export const AdminTableRow = ({ children, className = "" }) => (
  <tr className={`admin-table-row group ${className}`}>
    {children}
  </tr>
);

export const AdminTableCell = ({ children, className = "", isHeader = false }) => {
  const Tag = isHeader ? 'th' : 'td';
  return (
    <Tag className={`px-6 py-4 text-sm text-[#FAFAFA] ${className}`}>
      {children}
    </Tag>
  );
};

export default AdminTable;
