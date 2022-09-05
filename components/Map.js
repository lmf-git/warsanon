import { setup } from "lib/map/controls";
import { useEffect } from "react";

export default function Map({ visibleRows }) {

    useEffect(() => {
        setup();
    }, []);

    return <table id="map" width="100%">
        <thead></thead>
        <tbody>
        { 
            visibleRows.map((row, rowIndex) => 
                <tr key={`map-row-${rowIndex}`}>
                <td key={`map-row-help-${rowIndex}`}>
                    {row[0].y}
                </td>
                {
                    row.map(cell => 
                    <td 
                        data-x={cell.x}
                        data-y={cell.y}
                        style={{ backgroundImage: `url(${cell.biome_url})` }}
                        key={`map-row-${cell.y}-cell-${cell.x}`}>

                        {
                            cell.x >= 0 && cell.y >= 0 ?
                            <img width="100%" src={cell.village_url} />
                            :
                            '?'
                        }


                        {/* {cell.x} | {cell.y} */}
                    </td>
                    )
                }
                </tr>
            ) 
        }
        <tr className='footer-label-row'>
            <td className='blank-col' />
            { 
                (visibleRows?.[0] || []).map((cell, cellIndex) => 
                <td key={`map-cell-help-${cellIndex}`}>
                    <span className='footer-label'>{cell.x}</span>
                </td>
                )
            }
        </tr>
        </tbody>
    </table>
}