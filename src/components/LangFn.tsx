import langs from '@/data/langs';
import { setLanguage } from '@/redux/reducer/globalSettingReducer';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { setLangDisplay } from '@/redux/reducer/globalSettingReducer';

type LangOption = {
  name: string;
  value: string;
};

export default function LangFn({
  setOpenLang,
}: {
  setOpenLang: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {langs.map((item: LangOption) => (
        <button
          key={item.value}
          className="font-body1 px-1 py-5 text-nowrap sm:px-5"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setLanguage(item.value));
            dispatch(setLangDisplay(item.name));
            setOpenLang(false);
          }}
        >
          {item.name}
        </button>
      ))}
    </>
  );
}
