import React from "react";

export const ProductCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
        {/* Image placeholder */}
        <div className="w-full h-48 bg-gray-200 animate-pulse" />

        {/* Content area */}
        <div className="p-4 space-y-3">
            {/* Title placeholder */}
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>

            {/* Price placeholder */}
            <div className="flex items-center space-x-2">
                <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse"></div>
            </div>

            {/* Rating placeholder */}
            <div className="flex items-center">
                <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                    ))}
                </div>
            </div>

            {/* Button placeholder */}
            <div className="h-9 bg-gray-200 rounded-full w-full mt-4 animate-pulse"></div>
        </div>
    </div>
);
