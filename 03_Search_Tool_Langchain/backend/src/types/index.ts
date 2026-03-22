export interface Candidate {
    answer: string,
    sources: string[],
    mode: 'web' | 'direct',
}