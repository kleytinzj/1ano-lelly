import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from './components/Countdown';

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`bg-white/80 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-lg my-8 w-full max-w-4xl mx-auto ${className}`}>
    {children}
  </motion.div>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
        <path d="m11.645 20.91-1.112-1.023C5.645 15.31 2.25 12.174 2.25 8.5 2.25 5.42 4.42 3.25 7.5 3.25c1.74 0 3.41.81 4.5 2.09C13.09 4.06 14.76 3.25 16.5 3.25 19.58 3.25 21.75 5.42 21.75 8.5c0 3.674-3.395 6.81-8.283 11.388L12 21.239z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const InteractiveModal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="content"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative bg-white rounded-2xl shadow-2xl z-10 max-w-lg w-full p-6 text-center"
      >
        {children}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400" aria-label="Fechar">
           <CloseIcon />
        </button>
      </motion.div>
    </div>
  );
};


export default function App() {
  const [isHeartModalOpen, setHeartModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastShown, setToastShown] = useState(false);

  const signatureRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (signatureRef.current && !toastShown) {
        const { top } = signatureRef.current.getBoundingClientRect();
        const isVisible = top < window.innerHeight;
        if (isVisible) {
          setTimeout(() => setShowToast(true), 500);
          setTimeout(() => setShowToast(false), 5500); 
          setToastShown(true); 
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toastShown]);
  
  const anniversaryDate = new Date('2023-11-13T23:59:00');

  return (
    <div className="bg-pink-100/50 min-h-screen text-gray-800 p-4 sm:p-6 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-sm shadow-md text-center">
            <h2 className="text-xl font-bold text-pink-600 font-cursive">Eu te amo, Elen Barbosa de Araujo ❤️</h2>
        </header>

      <main className="container mx-auto pt-20 text-center">
        <span className="block text-pink-500 font-semibold mb-4">De: Kleyton <br /> Para: Lelly</span>

        <h1 className="text-4xl sm:text-6xl font-cursive font-bold text-pink-600 drop-shadow-md">
          AMOR, 1 ANO DE <span className="text-red-500 animate-pulse">NAMORO</span>!!!!!!!!
        </h1>

        <Section>
            <p className="text-lg leading-relaxed">Amor, hoje completamos 1 ano!!! Foi incrível como tudo começou e onde chegamos. Cada momento ao seu lado tem sido uma mistura de descobertas e alegrias que só fortalecem o que eu sinto por você. Desde as primeiras conversas você trouxe um brilho único e inexplicável para a minha vida, eu tenho muito orgulho da mulher que você é e vem se tornando cada dia mais.</p>
        </Section>
        
        <Section>
            <h2 className="text-3xl font-cursive text-pink-500 mb-4">Estamos juntos há:</h2>
            <Countdown startDate={anniversaryDate} />
        </Section>
        
        <Section>
            <p className="text-lg leading-relaxed">E durante todo esse tempo, você deve saber o quanto eu sou apaixonado e louco por você, o quanto eu amo cada detalhe seu e deixo claro o quanto sou seu fã número 1.</p>
            <p className="text-lg leading-relaxed mt-4">Nunca imaginei que a pessoa na qual eu sonhava ter, seria minha namorada. Nunca achei que as nossas conversas sobre FREE FIRE iriam fazer a gente chegar onde estamos. Só reforça a ideia de que você é exatamente quem eu quero pra minha vida!</p>
        </Section>

        <Section className="bg-pink-200/50 text-pink-900">
            <p className="text-xl font-semibold leading-relaxed">Tudo aconteceu bem rápido, mas de uma maneira boa. Nós fomos "emocionados" e fomos de conversante à namorados, entretanto, essa foi a minha melhor escolha. Você é minha melhor escolha da vida. Eu quero ser seu para o resto de nossas vidas. Eu quero casar com você, construir uma família e estar contigo em todas as conquistas, quero ser seu guarda-costas e seu porto seguro. Ser o homem que você vai vir para os meus braços quando estiver triste, ser aquele que você vai correr quando tudo estiver dando errado e eu vou te dar a certeza de que tudo ficará bem. Eu quero ser o SEU HOMEM para o resto das nossas vidas. Você me inspirou a fazer acontecer desde o começo, sempre me deixando à vontade em tudo. Criamos uma intimidade tão massa que me fez muito feliz, porque posso ser exatamente quem eu sou, sem precisar fingir ou tentar ser alguém diferente apenas para te agradar. E eu acredito que você também, você sendo você é uma das suas melhores qualidades, falando em qualidade, você é tão linda, maravilhosa e incrível, que eu passaria dias digitando nesse código e ainda assim não conseguiria explicar o quanto incrivel você é. <span className="text-red-500 font-bold animate-pulse">VOCÊ É MINHA NAMORADA HAHAHAHA</span></p>
        </Section>
        
        <Section>
            <h2 className="text-3xl font-cursive text-pink-500 mb-4">Amo cada detalhe seu</h2>
            <p className="text-lg leading-relaxed">Eu percebi que te amava quando meu dia só ficava feliz quando conversava com você, percebi que te amava que a cada "oi" seu, meu olho brilhava e o sorriso bobo se instalava, mesmo que ainda virtualmente. Eu percebi que te amava quando eu pedi a Deus que você fosse minha, pois você era e é tudo o que eu sonhava, você é meu sonho na realidade, como eu já disse várias vezes.</p>
            <p className="font-bold text-red-500 text-xl mt-4">EU PERCEBI QUE TE AMAVA QUANDO EU CHOREI IGUAL UMA CRIANÇA NA SUA FRENTE COM MEDO DE TE PERDER, PQ VOCÊ É O AMOR DA MINHA VIDA E A MINHA MULHER PARA O RESTO DAS NOSSAS VIDAS!!!!</p>
        </Section>

        <Section>
            <p className="text-lg leading-relaxed">Mas eu me lembro perfeitamente de como passei dias pensando se já era o momento certo de dizer que te amo. E na primeira vez que falei e você falou que também amava, eu me senti o homem mais feliz do mundo: a mulher que eu sonhei em ser minha estava me dizendo que me amava. TIPO, COMO??????</p>
            <p className="text-lg leading-relaxed mt-4">Desde então, só tenho uma coisa a dizer: eu te amo mais do que ontem e menos do que amanhã. Ainda são poucos os momentos registrados, porque, sinceramente, geralmente nós vivemos mais do que registramos. Nós raramente pegamos no celular quando estamos juntos, prefiro saborear o quão incrível é a sua presença comigo, isso que me faz ser o homem mais feliz do mundo. Mas o que eu realmente quero é ter tantos momentos ao seu lado que nossa galeria esteja cheia deles, quero ser parte da sua vida e o cara com quem você pode contar a todo momento.</p>
            <p className="text-lg leading-relaxed mt-4 font-semibold">E detalhe, o homem com quem você vai casar, ter filhos e dividir a vida até depois da morte.</p>
        </Section>

        <Section>
            <h2 className="text-4xl font-cursive text-pink-500 mb-6">Nossos momentos</h2>
            <span className="block text-lg mt-6 text-pink-600 font-semibold">E eu tô aqui mais uma vez; sendo o nerd que você conhece, vida!</span>
        </Section>

        <Section>
            <p className="text-lg leading-relaxed">Quero desejar para a gente tudo de bom e relembrar que tudo aconteceu em 3 meses, foi bem rápido. Para mim estamos juntos há anos, eu te amo muito.</p>
            <p className="text-lg leading-relaxed mt-4">Estamos juntos há 3 meses, faz três meses que te pedi em namoro, e posso contar um segredo? Não existe homem mais feliz que eu nesse mundo depois desse acontecimento. Você me faz ser melhor, você me faz ser um homem louco por você e com vontade de viver (algo que eu não tinha vontade antes) a vida toda ao seu lado. Vou deixar a contagem para que a gente volte aqui dnv futuramente e veja quanto tempo certinho ja estamos namorando.</p>
        </Section>

        <div className="my-12 cursor-pointer group" onClick={() => setHeartModalOpen(true)}>
            <h1 className="text-5xl sm:text-7xl font-cursive font-bold text-red-500 drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                EU TE AMO MUITO MINHA PRINCESA
            </h1>
            <div className="flex justify-center items-center space-x-2 mt-4 text-red-400 transition-transform duration-300 group-hover:scale-110">
                <HeartIcon className="w-8 h-8"/>
                <HeartIcon className="w-12 h-12"/>
                <HeartIcon className="w-8 h-8"/>
            </div>
            <span className="block text-lg text-center max-w-3xl mx-auto mt-6 text-pink-800 font-semibold p-4 bg-white/50 rounded-lg">
                Minha trevosa maravilhosa, minha gostosa, minha linda, minha gata, minha sorte e meu trevo de quatro folhas. EU TE AMO MUITO MINHA PRINCESA, VOCÊ É MEU TUDO. EU SOU COMPLETAMENTE LOUCO POR VOCÊ! COMPLETAMENTE APAIXONADO POR VOCÊ! COMPLETAMENTE OBCECADO POR VOCÊ! FELIZ 3 MESES MEU AMOOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRRRRRRRRR!!!!!!!!!!!!
            </span>
        </div>

        <Section className="bg-pink-200/50 text-pink-900">
          <h2 className="text-3xl font-cursive text-pink-500 mb-4">Nosso Primeiro Encontro</h2>
          <p className="text-lg">Não fazia ideia que a garota bonita do Instagram, que por vez, segui, tentei puxar assunto, paramos de nos falar e voltamos a nos falar por causa do Free Fire; iria, um dia, se tornar tudo isso aqui.</p>
        </Section>

        <Section>
          <h2 className="text-3xl font-cursive text-pink-500 mb-4">Nosso Primeiro Beijo</h2>
          <p className="text-lg">Nosso primeiro beijo tímido, o primeiro de nossas vidas e onde eu tive a certeza que era realmente apaixonado pela minha princesa. Beijo tímido, mas doce e que me levava ao paraíso em fração de segundos.</p>
        </Section>

        <Section>
          <h2 className="text-3xl font-cursive text-pink-500 mb-4">Nossa Primeira Conversa</h2>
          <p className="text-lg mb-6">Lembro como se fosse hoje nossa primeira e realmente conversa, no dia que fomos um x1 no Free Fire e foi onde começamos desenvolver a nossa história.</p>
        </Section>

        <Section>
          <h2 className="text-3xl font-cursive text-pink-500 mb-4">Altos e Baixos</h2>
          <p className="text-lg">É algo que sempre conversamos, e acho que, apesar de estresses, desavenças e possíveis mágoas (resolvidas), foi um processo necessário para chegar onde chegamos agora.</p>
          <p className="text-lg mt-4">Falei essa frase no WhatsApp, mas vou tornar a repeti-la aqui: Como esquecer do dia em que revelamos um ao outro que nos gostávamos e eu falei que te amava por mensagem? Acho que quando é para dar certo, independentemente do quanto a gente tente fugir, acontece. Ainda bem que a gente não conseguiu fugir um do outro, porque, sinceramente, te perder não é uma opção. Inclusive, favoritei a primeira vez que você disse que me amava também, que, apesar das circunstâncias, foi um marco decisivo para a gente.</p>
        </Section>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="my-10 p-10 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl shadow-xl">
             <h2 className="text-5xl font-cursive text-white drop-shadow-lg">Aí tudo mudou...</h2>
        </motion.div>

        <Section>
            <p className="text-lg">Se perguntasse ao Kleyton do começo do ano se ele acreditava que ele estaria namorando uma mulher tão incrível agora no final do ano, provavelmente ele chamaria o questionador de doido.</p>
            <p className="text-lg mt-4">Aliás, se o perguntassem se ele se declararia dessa forma, ele também diria que era impossível e que essa atitude não era do seu feitio. Qual é, eu estou literally me declarando para a minha namorada em forma de site. Existe forma de ser mais nerd do que isso?</p>
            <p className="text-lg mt-4">Enfim, a gente sempre conversou e se acertou sobre tudo, e acho que essa é uma das coisas mais valiosas sobre nós dois. Nunca tive nada assim, e, na verdade, nunca achei que teria. As conversas, as piadas, o respeito, a nossa química... parecia que a gente se encaixava em tudo, e a simples "menina estilosa do Instagram" passou a ser tudo para mim. Evoluimos juntos desde o começo, e você me ajudou a enxergar a vida de outra forma, mesmo que indiretamente.</p>
            <p className="text-lg mt-4">O Kleyton da vida cinzenta deu lugar ao amor, e estar contigo é o único lugar no qual eu quero - e preciso - estar.</p>
            <div className="flex justify-center mt-6"><HeartIcon className="w-10 h-10 text-pink-400 animate-pulse" /></div>
        </Section>

        <Section>
            <h2 className="text-3xl font-cursive text-pink-500 mb-4">Eu te amo</h2>
            <p className="text-lg">Mas, na verdade, a palavra não representa 1/3 do que eu realmente sinto quando te vejo, quando te toco, quando sinto seu cheiro e saio de casa para ir te ver contando os minutos para poder visualizar seu rostinho de perto.</p>
            <p className="text-lg mt-4">Realmente não há nenhuma palavra que defina isso aqui.</p>
            <p ref={signatureRef} className="text-2xl mt-8 font-cursive text-pink-600">Ass.: Seu nerdão <span className="text-red-500">&lt;3</span></p>
        </Section>

        <Section>
             <h3 className="text-2xl sm:text-3xl font-bold text-pink-800 leading-relaxed">A MINHA VIDA SÓ SE TORNA TOLERÁVEL COM VOCÊ, VOCÊ É A LUZ DA MINHA VIDA, VOCÊ É A MINHA VIDA. VOCÊ É MEU TUDO, MINHA PAZ, MEU ACONCHEGO, MEU PORTO SEGURO E TUDO QUE EU PRECISO. VOCÊ É MINHA PRINCESA! EU TE AMO, MINHA LELLY!</h3>
        </Section>

      </main>

      <footer className="text-center p-6 text-pink-800 font-semibold">
        Criado por Kleyton, com muito amor para Elen ❤️
      </footer>

      <AnimatePresence>
        {isHeartModalOpen && (
          <InteractiveModal onClose={() => setHeartModalOpen(false)}>
            <HeartIcon className="w-16 h-16 text-red-400 mx-auto mb-4 animate-ping" />
            <p className="text-2xl font-cursive text-pink-600">
              "Cada batida do meu coração é por você, meu amor. Te amo infinitamente!"
            </p>
          </InteractiveModal>
        )}
        {showToast && (
          <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="fixed bottom-5 right-5 z-[100] bg-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-xl flex items-center gap-2"
          >
              <HeartIcon className="w-5 h-5" />
              <span>PS: Você é a melhor coisa que já me aconteceu.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}