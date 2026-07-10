import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | corazza.dev",
  description: "Como lidamos com seus dados e informações.",
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <article className="
        bg-theme-bg2 p-6 lg:p-10 rounded-xl
        prose prose-slate lg:prose-lg max-w-none dark:prose-invert
        prose-headings:text-theme-sec prose-a:text-blue-500 hover:prose-a:underline
      ">
        <h1>Política de Privacidade</h1>

        <p>A sua privacidade é importante para nós. É política do blog <strong>corazza.dev</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.</p>

        <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>

        <h2>Google AdSense e Cookies de Publicidade</h2>
        <p>Este site utiliza o <strong>Google AdSense</strong> para exibir anúncios. Como fornecedor terceirizado, o Google usa cookies para veicular anúncios com base nas suas visitas anteriores a este e a outros sites na internet.</p>

        <ul>
          <li>O uso de cookies de publicidade pelo Google permite que ele e seus parceiros veiculem anúncios para os usuários com base nas visitas feitas aos nossos sites e/ou a outros sites na internet.</li>
          <li>Você pode desativar a publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Configurações de anúncios do Google</a>.</li>
        </ul>

        <h2>Consentimento</h2>
        <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.</p>

        <p><em>Esta política é efetiva a partir de Julho de 2026.</em></p>
      </article>
    </div>
  );
}