export default function BaseButton(props: any) {
  return (
    <button onClick={props.onClick}
            className={'px-6 py-2 text-sm transition-colors duration-300 rounded rounded-full shadow-xl bg-slate-500 hover:bg-slate-600 text-slate-100 shadow-slate-400/30'}>
      {props.children}
    </button>)
}
