export const profile = {
  name: 'Bernardo Freguglia',
  fullName: 'Bernardo Brandão Freguglia',
  email: 'bfreguglia.dev@gmail.com',
  github: 'https://github.com/beefreguglia',
  githubHandle: 'beefreguglia',
  linkedin: 'https://www.linkedin.com/in/bernardo-freguglia/',
  linkedinHandle: 'bernardo-freguglia',
  avatar: 'https://github.com/beefreguglia.png',
  startedCoding: 2012,
  cvPdf: '/cv/bernardo-freguglia-cv.pdf',
  siteUrl: 'https://bfreguglia.vercel.app',
} as const;

/** "Nível" do personagem: anos desde o primeiro plugin de Minecraft. */
export function characterLevel(now = new Date()) {
  return now.getFullYear() - profile.startedCoding;
}
