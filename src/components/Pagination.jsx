const Pagination = (props) => {

    const pagesCount = Math.ceil(props.length / props.itemsPerPage) //on compte le nombre de pages avec les propriétés qu'on définira sur la page, 
    const pages = []

    for(let i=1; i<= pagesCount; i++)
    {
        pages.push(i) // de 1 jusqu'au nombre de page je pousse le i dans le tableau pour avoir toute mes pages
    }

    return ( 
        <div>
            <ul className="pagination pagination-sm justify-content-center">
                <li className={"page-item" + (props.currentPage === 1 ? " disabled" : null)}> {/* si c'est la page 1 je désactive le bouton */}
                    <button className="page-link" onClick={() => props.onPageChanged(props.currentPage - 1)} >&laquo;</button> {/* au clique j'appelle la fonction onPageChange pour changer de page je fais une fonction fléchée pour pas qu'elle s'exécute directement (boucle infinie) */} 
                </li>
                {pages.map(page => (
                    <li key={page} className={"page-item" + (props.currentPage === page ? " active" : null)}> {/* définir la classe active du bouton et executé la fonction au clique*/} 
                        <button className="page-link" onClick={() => props.onPageChanged(page)}>{page}</button>
                    </li>
                ))}
                <li className={"page-item" + (props.currentPage === pagesCount ? " disabled" : null)}> {/* si c'est la dernière page je désactive le bouton suivant*/} 
                    <button className="page-link" onClick={() => props.onPageChanged(props.currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
     );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage
    //              3         * 10          -   10          =   20  
    return items.slice(start, start + itemsPerPage)
    // arr.slice(debut, fin)
}

export default Pagination;