import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getLocale, setLocale } from 'umi-plugin-react/locale';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import { ConnectState } from '@/models/connect';
import { connect } from 'dva';
import { ApplicationConfiguration } from '@/models/global';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

interface SelectLangProps {
  className?: string;
  localization?: ApplicationConfiguration.Localization;
}

const SelectLang: React.FC<SelectLangProps> = props => {
  const { className, localization } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }: ClickParam): void => setLocale(key);


  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {localization?.languages.map(locale => (
        <Menu.Item key={locale.cultureName}>
          <span role="img" aria-label={locale.displayName}>
            {locale.flagIcon}
          </span>{' '}
          {locale.displayName}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <GlobalOutlined title="语言" />
      </span>
    </HeaderDropdown>
  );
};
export default connect(({ global }: ConnectState) => ({
  localization:global.applicationConfiguration?.localization
}))(SelectLang);
