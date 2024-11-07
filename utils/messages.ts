export const getRandomSelectMessage = (name: string) => {
  const messages = [
    `Hey ${name}, what's your focus today? Socialize or study?`,
    `Ready to socialize, ${name}? Or get productive and organize?`,
    `What's your vibe, ${name}? Fun or focus?`,
    `Choose your space, ${name}: Connect with others or organize your notes!`,
    `${name}, are you here to study or socialize?`,
    `What's on your agenda today, ${name}? Social or study?`,
    `Hey ${name}, let's get started! Chat with others or dive into learning?`,
    `What's your mood today, ${name}? Fun or focus?`,
    `Ready for study or social time, ${name}? Choose your path!`,
    `${name}, study mode or social mode?`
  ]
  return messages[Math.floor(Math.random() * messages.length)]
} 