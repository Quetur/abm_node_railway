import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
   
    try {
        //throw new Error('db error')
        const [rows] = await pool.query('select * from employee')
        res.json(rows)

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

export const getEmployee = async (req, res) => {
    console.log(req.params.id)
    const [rows] = await pool.query('select * from employee where id=?', [req.params.id])
    res.json(rows)

    /*
    if (rows.length <= 0) return res.status(404).json({
        message: 'Employee not found'
    })
    */
    console.log(rows[0])
}


export const createEmployee = async (req, res) => {
    const { name, salary } = req.body
    const [rows] = await pool.query('insert into employee (name, salary) values (?, ?)', [name, salary])
    console.log(req.body)
    res.send({
        id: rows.insertId,
        name,
        salary,
    })
}


export const deleteEmployee = async (req, res) => {
    console.log(req.params.id)
    const [result] = await pool.query('delete from employee where id=?', [req.params.id])

    console.log(result)

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Employee not found'
    })
    res.sendStatus(204)
}

export const updateEmployee = async (req, res) => {

    const { id } = req.params
    const { name, salary } = req.body

    const result = await pool.query('update employee set name = IFNULL(?,name), salary = IFNULL(?, salary) where id = ? ', [name, salary, id])

    console.log(result)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Employee not found'
    })

    const [rows] = await pool.query('select * from employee where id = ?', [id])

    res.json(rows[0])




    // res.json('recived')
}
