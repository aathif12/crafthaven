@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product createProduct(Product p) {
        return productRepo.save(p);
    }
}
