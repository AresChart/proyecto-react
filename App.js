/**
 * Pagina principal que lanza las vistas correspondientes
 * @author Kevin David Sanchez Solis
 */
import particionesView from './Views/PartitionsView';
import mapaBits from './Views/AssignmentAlgorithmsView';
import pagination from './Views/PaginationView';
import segmentation from './Views/SegmentationView';

/**
 * Metodo que Gestiona la vista principal del aplicativo
 * @returns La vista Principal del Programa
 */
const App = () => {

  return (
  
    //particionesView()
    mapaBits()
    //pagination()
    //segmentation()

  )
}

export default App;