import React from "react";
import cn from "classnames";
import "./Categories.scss";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {change} from "../../store/reducers/NavSlice";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Categories() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const dispatch = useAppDispatch();

    const categories = useAppSelector(state => state.categoriesReduser.categories);

    const loadFilteredProduct = (id: number) => {
    }

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className="catagories-side-menu">
            <div id="sideMenuClose" onClick={() => dispatch(change())}>
                <i className="ti-close"></i>
            </div>
            <div className="nav-side-menu">
                <div className="menu-list">
                    <h6>Categories</h6>
                    {categories.filter((item) => item.children_category.length > 0).map((item) => (
                        <Accordion key={item.id} expanded={expanded === `panel${item.id}`}
                                   onChange={handleChange(`panel${item.id}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{item.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {
                                        item.children_category.map((subItem) => (
                                            <li className="ml-3 pt-3 pb-3 fs-6" key={subItem.id}><Link
                                                to="/">{subItem.name}</Link></li>
                                        ))
                                    }
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>


    );
}

export default Categories;