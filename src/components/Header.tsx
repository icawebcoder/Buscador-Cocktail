import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
    // Location se puede utilizar, para obtener información de uso del usuario, donde se encuentra ubicado y 
    // mostrar mi contenido en función de ello. 

    const location = useLocation()

    const [searchFilter, setSearchFilter] = useState({
        ingredient: '',
        category: ''
    })

    const isHome = useMemo(() => location.pathname === "/", [location.pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)



    useEffect(() => { fetchCategories() }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(searchFilter).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        // Consultar recetas
        searchRecipes(searchFilter)
    }


    return (
        <header className={
            isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"
        }>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="Logo" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                            }
                        >Inicio</NavLink>
                        <NavLink
                            to='/favoritos'
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                            }
                        >Favoritos</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form action="" className="md:w-1/2 2xl:w-1/3 bg-orange-400
                    my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o Ingredientes</label>
                            <input
                                type="text"
                                id="ingredient"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Vodka, Tequila, Café"
                                onChange={handleChange}
                                value={searchFilter.ingredient}
                            />
                        </div>
                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoría</label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilter.category}
                            >
                                <option value=""> -- Seleccione -- </option>
                                {categories.drinks.map(category => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input type="submit"
                            value='Buscar Recetas'
                            className="cursor-pointer text-white bg-orange-800 hover:bg-orange-900 
                            font-bold uppercase rounded-lg w-full p-2"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
