import s from "./AdditionalServices.module.scss"
import { services } from "@/data/data";
export function AdditionalServices() {

    return (
        <section className={s.services}>
            <div className={s.container}>
                <h2 className={s.title}>Дополнительные услуги</h2>
                <p className={s.subtitle}>Расширьте базовый уход за авто с нашими премиум опциями</p>

                <div className={s.tableContainer}>
                    <table className={s.servicesTable}>
                        <thead>
                            <tr>
                                <th>Услуга</th>
                                <th>Цена</th>
                                <th>Время</th>
                                <th>Особенности</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={index}>
                                    <td>{service.service}</td>
                                    <td className={s.priceCell}>{service.price}</td>
                                    <td>{service.time}</td>
                                    <td>{service.features}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={s.mobileCards}>
                    {services.map((service, index) => (
                        <div key={index} className={s.serviceCard}>
                            <div className={s.cardHeader}>
                                <h3 className={s.cardTitle}>{service.service}</h3>
                                <span className={s.cardPrice}>{service.price}</span>
                            </div>
                            <div className={s.cardDetails}>
                                <div className={s.detailItem}>
                                    <span className={s.detailLabel}>Время:</span>
                                    <span>{service.time}</span>
                                </div>
                                <div className={s.detailItem}>
                                    <span className={s.detailLabel}>Особенности:</span>
                                    <span>{service.features}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}