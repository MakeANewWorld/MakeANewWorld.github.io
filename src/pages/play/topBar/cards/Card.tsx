import React from "react";

export const Card: React.FC<{ title: string, bottom?: boolean, contentClasses?: string, children: React.ReactNode }> = ({ title, bottom = true, contentClasses = '', children }) => {
    return (
        <div className={`rounded-lg border border-gray-200 dark:border-[#383838] shadow-sm ${bottom ? 'mb-2' : ''}`}>
            <div className="px-4 py-2 border-b border-gray-200 dark:border-[#383838] font-medium rounded-t-lg">
                {title}
            </div>
            <ul className={`divide-y divide-gray-200 dark-border ${contentClasses}`}>
                {children}
            </ul>
        </div>
    );
};