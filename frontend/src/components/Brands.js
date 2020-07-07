import styles from '@styles/modules/Brands.module.scss';

const Brands = ({ data, changeBrand }) => {

  // console.log('brands: ', data)
  const onChangeBrand = () => {
    console.log('onChangeBrand');
    
    changeBrand(brand)
  }

  return (
    <div className={styles.brands}>

      <h2 className={styles.label}>Brands</h2>
      <div className={styles.line}></div>

      <div className={styles.brandList}>
        {data.map((brand, index) => {
          // console.log('brand: ', brand.title, brand);
          return (
            <a
              href="#"
              className={styles.brand}
              key={index}
              onClick={onChangeBrand}
            >
              <h2>{brand.title.toLowerCase()}</h2>
            </a>
          )
        })}
      </div>

    </div>
  )
}

export default Brands