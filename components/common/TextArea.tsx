import { forwardRef, TextareaHTMLAttributes } from 'react';

const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => {
    return (
        <textarea
            className="appearance-none bg-neutral-600 border-b-2 border-t-2 border-neutral-600 focus:border-b-cyan-500 transition-all rounded-md shadow-sm outline-none px-2 py-0.5 my-1"
            ref={ref}
            {...props}
        />
    );
});

TextArea.displayName = 'TextArea';
export default TextArea;