const RowSkeletion = () => {
    return <tr className="dark:hover:bg-gray-700 hover:bg-blue-50 animate-pulse">
        <th>
            <div className='h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-6' />
        </th>
        <td>
            <div className='flex items-center'>
                <div>
                    <div className="flex justify-center items-center w-6 h-6 bg-gray-300 rounded-full dark:bg-gray-700" />
                </div>
                <div className="ml-2 space-y-1">
                    <div className="flex justify-center items-center w-16 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
                    <div className="flex justify-center items-center w-16 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
                </div>
            </div>
        </td>
        <td>
            <div className="flex justify-center items-center w-16 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </td>
        <td>
            <div className="flex justify-center items-center w-16 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </td>
        <td>
            <div className="flex justify-center items-center w-24 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </td>
        <td>
            <div className="flex justify-center items-center w-24 h-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </td>
        <td>
            <div className="flex justify-center items-center w-36 h-16 bg-gray-300 rounded-sm dark:bg-gray-700" />
        </td>
    </tr>
}

export default RowSkeletion;