import HeaderData from '../../../data/Home3/Header.json';

const Header = () => {
  return (
    <header className="ui-header valign">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="cont text-center">
              <h1>{ HeaderData.text }</h1>
              <div className="text">{ HeaderData.bgLetter }</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header