import './Home.css'
import { setAll } from '@/Root';
import { FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { checkAndGetUser, findUser } from '@/pages/user/User';
import { isNullish } from 'utility-types';
import { useTranslation } from 'react-i18next';
import { preload } from 'react-dom';
import { Links } from './Links';
import { ThemeProvider } from '@/components/theme-provider';

export const Home: React.FC<{}> = ({ }) => {
  setAll();
  preload('crepper.svg', { as: 'image' });
  preload('java-logo.svg', { as: 'image' });
  preload('minecraft-logo.svg', { as: 'image' });

  const [helloMessage, setHelloMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setInterval(() => {
      if (!findUser() || !isNullish(helloMessage)) return;
      const email: string = !isNullish(checkAndGetUser().email) ? (checkAndGetUser().email as string) : '';
      setHelloMessage(t('greeting-prompt') + email);
    }, 100);
  }, []);

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <div className="container mx-auto px-4">
        <header className="flex flex-wrap items-center justify-center md:justify-between py-3 mb-4 border-b">
          <div className="w-full md:w-1/4 mb-2 md:mb-0">
            <a href="/" className="inline-flex items-center text-gray-900 no-underline">
              <img className="bi" src="crepper.svg" alt="Crepper" width="40" height="32" />
            </a>
          </div>

          <ul className="flex justify-center w-full md:w-auto mb-2 md:mb-0">
            <Links t={t}></Links>
          </ul>

          <div className="w-full md:w-1/4 text-right">
            {helloMessage !== null ?
              <span>{helloMessage}</span> :
              (<>
                <a className="inline-block px-4 py-2 mr-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-950" href="/user" role="button">{t("login")}</a>
                <a className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" href="/user" role="button">{t("sign-up")}</a>
              </>)
            }
          </div>
        </header>
      </div>

      <div className="px-4 text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="text-center">
            <img src="java-logo.svg" alt="Java Logo" width="144" height="114" />
            <h2 className="text-2xl mt-2 font-bold">Java</h2>
          </div>
          <FiX className="mx-2" size={64} />
          <div className="text-center">
            <img src="minecraft-logo.svg" alt="Minecraft Logo" width="144" height="114" />
            <h2 className="text-2xl mt-2 font-bold">Minecraft</h2>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-1" dangerouslySetInnerHTML={{ __html: t('learn-programming') }}></p>
          <p className="text-lg mb-1" dangerouslySetInnerHTML={{ __html: t('mod-creation') }}></p>
          <p className="text-lg mb-1" dangerouslySetInnerHTML={{ __html: t('no-experience-needed') }}></p>
          <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: t('ready-to-start') }}></p>
          <div className="grid sm:flex gap-2 justify-center">
            <button onClick={() => location.href = "/get-start"} className="px-4 py-2 text-white bg-blue-600 rounded-md text-lg hover:bg-blue-700">{t('start')}</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <footer className="flex flex-wrap justify-between items-center py-3 mt-4 border-t">
          <p className="w-full md:w-1/4 mb-0 text-gray-500">&copy; 2025</p>

          <a href="/" className="w-full md:w-1/4 flex items-center justify-center mb-3 md:mb-0 md:mx-auto text-gray-900 no-underline">
            <img className="bi mr-2" src="crepper.svg" alt="Crepper" width="40" height="32" />
          </a>

          <ul className="w-full md:w-1/4 flex justify-end">
            <Links t={t}></Links>
          </ul>
        </footer>
      </div>
      </ThemeProvider>
  )
};