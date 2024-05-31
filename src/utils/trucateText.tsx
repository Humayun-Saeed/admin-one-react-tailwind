export function truncateText(text: string, maxLength: any) {
    if (text?.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    }
    return text;
}
