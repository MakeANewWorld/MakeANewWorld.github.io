export const Prompt: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="absolute bottom-full mb-2 hidden group-hover:block left-1/2 
                        transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white 
                        text-xs rounded whitespace-nowrap">
            {content}
        </div>
    );
};