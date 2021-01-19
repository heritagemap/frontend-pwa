import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { InfoInterface } from 'interfaces/FullInfo';
import getStatus from 'utils/getStatus';
import getSource, { SOURCE } from 'utils/getSource';
import getRoute from 'utils/getRoute';
import getProtegtion from 'utils/getProtegtion';

import { RESOURCE } from 'constants/map';

import FullInfo from 'components/FullInfo';

import {
  Destroyed,
  Close,
  Status,
  Address,
  Wiki,
  Sobory,
  LinkIcon,
  ExtraLink,
  Templates,
} from 'icons';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<InfoInterface | undefined>(undefined);
  const [source, setSource] = useState<string>(SOURCE);

  const {
    id,
    lat,
    lon,
  }: { id?: string | number; lat?: string; lon?: string } = useParams();
  const history = useHistory();

  const handleClose = () => {
    history.push(getRoute({ lat, lon }));
  };

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setInfo(undefined);

      try {
        const response = await fetch(
          `${RESOURCE}?id=${id}`,
        );

        const text: string = await response.text();

        const infoJSON: InfoInterface = JSON.parse(text);

        setInfo(infoJSON);
        setSource(
          getSource({
            region: infoJSON?.region,
            municipality: infoJSON?.municipality,
            district: infoJSON?.district,
          }),
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInfo();
  }, [id]);

  if (!id) return null;

  const status = info ? getStatus(info.type, info.knid) : '';
  const protection = info?.protection ? getProtegtion(info.protection) : '';

  return (
    <section className={styles.sidebar}>
      {loading && 'Загрузка... '}

      <div className={styles.header}>
        <h1 className={styles.title}>{info?.name}</h1>

        <button type="button" onClick={handleClose} className={styles.close}>
          <Close />
        </button>
      </div>

      {info?.year && <p className={styles.mainInfo}>{info.year}</p>}

      {info?.style && (
        <p className={styles.mainInfo}>
          Стиль:
          {info?.style}
        </p>
      )}

      {info?.author && <p className={styles.mainInfo}>{info?.author}</p>}

      {(info?.description || info?.status === 'destroyed') && (
        <p className={styles.mainInfo}>
          {info?.status === 'destroyed' && (
            <span className={styles.destroyed}>
              <Destroyed />

              <span>
                Утрачен
                {info?.description ? '. ' : ''}
              </span>
            </span>
          )}

          {info?.description && <span>{info?.description.replace(/<(.*?)>/g, '')}</span>}
        </p>
      )}

      {status && (
        <div className={styles.info}>
          <Status />

          <div className={styles.text}>
            {status}
            {protection ? `${protection} ` : ' '}
            {info?.knid_new && (
              <span
                className={styles.egrokn}
                title="Номер в Едином государственном реестре объектов культурного наследия"
              >
                {info.knid_new}
              </span>
            )}
          </div>
        </div>
      )}

      {info?.address && (
        <div className={styles.info}>
          <Address />

          <div className={styles.text}>{info.address}</div>
        </div>
      )}

      {info?.image && <FullInfo image={info.image} />}

      {info?.wiki && (
        <div className={styles.info}>
          <Wiki />

          <a
            href={`https://ru.wikipedia.org/wiki/${info.wiki}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.text}
          >
            <span>Статья в Википедии</span>
          </a>
        </div>
      )}

      {info?.sobory && (
        <div className={styles.info}>
          <Sobory />

          <a
            href={`https://sobory.ru/article/?object=${info.sobory}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.text}
          >
            <span>Объект на сайте sobory.ru</span>
          </a>
        </div>
      )}

      {info?.temples && (
        <div className={styles.info}>
          <Templates />

          <a
            href={`http://temples.ru/card.php?ID=${info.temples}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.text}
          >
            <span>Объект в проекте «Храмы России»</span>
          </a>
        </div>
      )}

      {info?.link && (
        <div className={styles.info}>
          <LinkIcon />

          <a
            href={info.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.text}
          >
            <span>Дополнительная информация</span>
          </a>
        </div>
      )}

      {info?.linkextra && (
        <div className={styles.info}>
          <ExtraLink />

          <a
            href={info.linkextra}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.text}
          >
            <span>И ещё информация</span>
          </a>
        </div>
      )}

      <div className={styles.license}>
        Информация об объектах взята из
        {' '}
        {}
        <a href={source} target="_blank" rel="noopener noreferrer">
          Викигида
        </a>
        <br />
        Эти данные доступны по лицензии
        {' '}
        {}
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/deed.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC-By-SA 3.0
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
