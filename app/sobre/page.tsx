import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | corazza.dev",
  description: "Conheça mais sobre o autor e o propósito do blog.",
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <article className="
        bg-theme-bg2 p-6 lg:p-10 rounded-xl
        prose prose-slate lg:prose-lg max-w-none dark:prose-invert
        prose-headings:text-theme-sec prose-a:text-blue-500 hover:prose-a:underline
      ">
        <h1>Sobre o Autor</h1>

        <p>Bem-vindo ao <strong>corazza.dev</strong>!</p>

        <p>
          Eu sou <strong>Marcos Corazza</strong>, e este espaço é o meu laboratório e arquivo digital.
          Criei este blog com o propósito de documentar, de forma profunda e estruturada, meus estudos,
          desafios e soluções nas áreas de Engenharia de Software, Ciência de Dados e Arquitetura de Sistemas.
        </p>

        <p>
          Acredito que a melhor forma de consolidar o conhecimento é compartilhando. Por isso, organizo meus
          conteúdos em formato de Trilhas de Estudo, visando criar guias completos, interativos e fáceis
          de consultar para outros desenvolvedores e entusiastas da tecnologia.
        </p>

        <h2>Contato e Redes</h2>
        <p>
          Ficou com alguma dúvida sobre um post, encontrou algum erro ou quer trocar uma ideia sobre tecnologia?
          Sinta-se à vontade para entrar em contato:
        </p>
        <ul>
          <li><strong>E-mail:</strong> corazza.dev@gmail.com</li>
          <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/corazza" target="_blank" rel="noopener noreferrer">Acessar perfil</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/mcscorazza" target="_blank" rel="noopener noreferrer">Acessar repositório</a></li>
        </ul>
      </article>
    </div>
  );
}