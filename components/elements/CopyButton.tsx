import { FC } from 'react'
import { Copy } from 'components/svgs'
import clsx from 'clsx'

interface CopyButtonProps {
    code: string;
    className?: string;
}

const CopyButton: FC<CopyButtonProps> = ({ code, className }) => {
    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(code);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button
            className={clsx(
                'rounded-xl border border-[#191919] border-transparent p-2 px-3 py-2 text-sm font-medium leading-4 shadow-sm transition hover:border-[#484848] dark:text-white dark:text-[#C2C2C2] dark:hover:bg-[#343434]',
                className
            )}
            onClick={handleClick}
        >
            <Copy width={32} height={32} />
        </button>
    );
};

export default CopyButton;
