import { appId } from '../../app.json';

interface IBaseConfig {
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';

  appId: string;
  privacyPolicy: {
    zh_cn: string;
    en_us: string;
  };
  userAgreement: {
    zh_cn: string;
    en_us: string;
  };
}

const BaseConfig: IBaseConfig = {
  persistNavigation: 'dev',

  appId,

  privacyPolicy: {
    zh_cn: 'https://zh-cn/privacy-policy',
    en_us: 'https://en-us/privacy-policy',
  },

  userAgreement: {
    zh_cn: 'https://zh-cn/user-agreement',
    en_us: 'https://en-us/user-agreement',
  },
};

export type PersistNavigationConfig = IBaseConfig['persistNavigation'];

export default BaseConfig;
