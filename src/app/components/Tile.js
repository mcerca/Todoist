
export default function Title({txt = 'Seu texto aqui'} = props) {
  let Today = new Date().toLocaleDateString('en-us', { weekday: 'long' });
	let day = new Date().toLocaleDateString('en-us', { day: 'numeric' });
	let month = new Date().toLocaleDateString('en-us', { month: 'short' });

  return (
    <h1>{txt} ({`${Today},`} <span>{`${day} ${month}`}</span>)</h1>
  )
}
