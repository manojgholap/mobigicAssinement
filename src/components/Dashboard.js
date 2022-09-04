import React, { useState, useEffect } from "react"
import { Input, Card, Button, Label, Container } from "reactstrap"
import { BallTriangle } from 'react-loader-spinner';


export default function Dashboard() {
  const [loader, setLoader] = useState(true)
  const [rowCol, setRowcolumns] = useState({
    row: "",
    column: "",
  })
  const [grid, setGrid] = useState([])
  const [tableData, setTableData] = useState([]);
  const [nextAlphabet, setAlphaBet] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, [3000])
  }, [])

  const handleClick = (action) => () => {
    switch (action) {
      case 'generateGrid':
        if (!rowCol.row || !rowCol.column) return alert('add rows or columns');
        let gridArray = Array(parseInt(rowCol.row)).fill(0).map(row => new Array(parseInt(rowCol.column)).fill(''))
        setGrid(gridArray);
        setTableData(gridArray);
        return setRowcolumns({
          row: "",
          column: ""
        });
      case 'addAlphabets':
        if (!nextAlphabet) return alert("add alphabet first")
        if (grid.length) {
          let rowsLength = grid.length - 1;
          let columnsLength = grid[rowsLength].length - 1;
          var skip = false
          if (grid[rowsLength][columnsLength] !== '') return alert("grid full");
          for (var i = 0; i <= grid.length && !skip; i++) {
            for (var j = 0; j <= grid[i].length && !skip; j++) {
              if (grid[i][j] == '') {
                grid[i][j] = nextAlphabet;
                tableData[i][j]=nextAlphabet
                setGrid([...grid])
                setTableData([...tableData])
                skip = true
              }
            }
          }
        }
        break;
      case 'reset':
        setGrid([]);
        break;
      default:
        break;
    }
  }

  function handleSearch(value) {
    if (!value) {
      setTableData([...grid])
      return
    }
    else {
      tableData.forEach((gridItem, ind) => {
        gridItem.forEach((data, index) => {
          if (!data.includes(value)) {
            tableData[ind][index] = ''
            setTableData([...tableData])
          }
        })
      })
    }
  }

  const handleChange = (action) => (e) => {
    if (action === 'row' || action === 'column')
      setRowcolumns({ ...rowCol, [action]: e.target.value })

    switch (action) {
      case 'setAlphabet':
        setAlphaBet(e.target.value)
        break;
      default:
        break;
    }
  }

  return (
    <Container className="container">
      {
        loader ? <BallTriangle
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
          :
          <>
            {
              !grid.length ?
                <Card className="card">
                  <Input
                    type="number"
                    placeholder="Enter no of rows"
                    className="p m br-4 br"
                    onChange={handleChange('row')}
                  />

                  <Input
                    type="number"
                    placeholder="Enter no of  columns"
                    className="p m br-4 br"
                    onChange={handleChange('column')}
                  />

                  <Button
                    className="p m br-4 br"
                    onClick={handleClick('generateGrid')}>
                    Generate Grid
                  </Button>

                </Card>
                :
                <>
                  <Card className="card">
                    <Input
                      type="text"
                      placeholder="enter alphabets"
                      className="p m br-4 br"
                      onChange={handleChange('setAlphabet')}
                    />
                    <Button
                      className="p m br-4 br"
                      onClick={handleClick('addAlphabets')}>Add Alphabets
                    </Button>
                    <Button
                      className="p m br-4 br"
                      onClick={handleClick('reset')}>Reset Grid
                    </Button>
                  </Card>
                  <Card className="mt">
                    <Input
                      type="text"
                      placeholder="search alphabet"
                      className="p mb br-4 br"
                      onChange={(e) => { handleSearch(e.target.value) }}
                    />
                    <table>
                      <tbody>
                        {tableData.map((data, index) => {
                          return (
                            <tr key={index}>
                              {
                                data.map((item, ind) => (<td key={ind} className="chip">{item}</td>))
                              }
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Card>
                </>
            }
          </>
      }

    </Container >
  )
}
