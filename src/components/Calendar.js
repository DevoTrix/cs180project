import './Calendar.css'

export default function Calendar() {
    return (
        <>
            <table className='calendar'>
                <thead>
                    <tr>
                        <th className='theader'>Sunday</th>
                        <th className='theader'>Monday</th>
                        <th className='theader'>Tuesday</th>
                        <th className='theader'>Wednesday</th>
                        <th className='theader'>Thursday</th>
                        <th className='theader'>Friday</th>
                        <th className='theader'>Saturday</th>
                    </tr>   
                </thead>
            </table>

            <table className='calbody'>
                <tbody>
                    
                <tr>
                    <td>9AM</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </>
    )
}