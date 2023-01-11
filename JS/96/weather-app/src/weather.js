
export default function Weather(props) {

  const { temp, loc } = props
  return (<h3>It is {Math.round(temp)} degrees in {loc}!</h3>)

}