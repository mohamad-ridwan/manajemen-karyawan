import { Button, CustomFlowbiteTheme, Spinner } from "flowbite-react";

type Props = {
    color?: 'light' | 'info'
    className?: string
    size?: 'sm' | 'md'
    theme?: CustomFlowbiteTheme['button']
}

export default function LoadingBtn({
    color = 'light',
    className,
    size = 'md',
    theme
}: Props) {
    return (
        <Button color={color} size={size} theme={theme} className={className} disabled>
            <Spinner
                size="sm"
                color="info"
                className="animate-spin"
                theme={{
                    size:{
                        sm: 'w-4 h-4'
                    }
                }}
            />
            <span className="pl-3">Loading...</span>
        </Button>
    )
}