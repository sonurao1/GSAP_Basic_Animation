

function Nav() {
  return (
 <>
  <nav className="flex justify-between p-6 px-100 bg-orange-600 items-center">
    <h1 className="text-4xl">Sonu</h1>

    <ul className="flex gap-8 items-center ">
        <li className="hover:texthsadow-lg transition-all duration-.25"><a href="#">Home</a></li>
        <li className="hover:texthsadow-lg transition-all duration-.25"><a href="#">About</a></li>
        <li className="hover:texthsadow-lg transition-all duration-.25"><a href="#">contact</a></li>
    </ul>
  </nav>
 </>  
 )
}

export default Nav