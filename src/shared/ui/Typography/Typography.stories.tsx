import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography, TypographyVariant } from './Typography';

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'large',
                'h1',
                'h2',
                'h3',
                'regular_text_16',
                'bold_text_16',
                'regular_text_14',
                'medium_text_14',
                'bold_text_14',
                'small_text',
                'semi_bold_small_text',
                'regular_link',
                'small_link',
            ] satisfies TypographyVariant[],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
    args: {
        variant: 'regular_text_16',
        children: 'Default typography text',
    },
};

export const Headings: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}
        >
            <Typography variant="large">Large text</Typography>
            <Typography variant="h1">Heading H1</Typography>
            <Typography variant="h2">Heading H2</Typography>
            <Typography variant="h3">Heading H3</Typography>
        </div>
    ),
};

export const TextVariants: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <Typography variant="regular_text_16">
                Regular text 16
            </Typography>

            <Typography variant="bold_text_16">
                Bold text 16
            </Typography>

            <Typography variant="regular_text_14">
                Regular text 14
            </Typography>

            <Typography variant="medium_text_14">
                Medium text 14
            </Typography>

            <Typography variant="bold_text_14">
                Bold text 14
            </Typography>

            <Typography variant="small_text">
                Small text
            </Typography>

            <Typography variant="semi_bold_small_text">
                Semi bold small text
            </Typography>
        </div>
    ),
};

export const Links: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <Typography
                variant="regular_link"
                href="/"
            >
                Regular link
            </Typography>

            <Typography
                variant="small_link"
                href="/"
            >
                Small link
            </Typography>
        </div>
    ),
};