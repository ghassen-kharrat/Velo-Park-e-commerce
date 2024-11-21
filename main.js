// Factory function to create product objects
function veloFactory(name, price, description, image) {
    return { name, price, description, image };
}

// Sample bike data
var Bike1 = veloFactory("Rockrider 800", 680, "The Rockrider 800 is our new comfortable and versatile model.", "https://contents.mediadecathlon.com/p1638915/k$360a0335ba8ca26de23a52c8abcf8ba6/sq/V+LO+VTT+ST+540+NOIR+ROUGE+27+5.jpg");
var Bike2 = veloFactory("Rockrider 650", 580, "The Rockrider 650 is a fun and comfortable model.", "https://contents.mediadecathlon.com/p1767131/k$bead683432ad0e2a16b3ed7b2e4fc0f7/sq/V+LO+VTT+ST+540+S+BLEU+ORANGE+27+5.jpg");
var Bike3 = veloFactory("Rockrider 700", 1600, "The Rockrider 700 is easy to handle and comfortable.", "https://contents.mediadecathlon.com/p1947527/k$fa2bd62f3fcc5440dcc050dedf02665b/sq/V+LO+VTT+ST+530+JAUNE+27+5.jpg");
var Bike4 = veloFactory("Rockrider 805", 690, "The Rockrider 800 is our new comfortable and versatile model.", "https://contents.mediadecathlon.com/p1947523/k$7d5b75859071291d5b0cdd5cb20dd314/sq/velo-vtt-st-120-gris-orange-275.jpg?format=auto&f=960x960");
var Bike5 = veloFactory("Rockrider 700", 889, "The Rockrider 800 is our new comfortable and versatile model.", "https://contents.mediadecathlon.com/p1863837/k$ef402fa4c1b6270d783701c05a73b863/sq/V+LO+VTT+LECTRIQUE+E+ST+100+BLEU+27+5.jpg");
var Bike6 = veloFactory("Rockrider 800 max", 470, "The Rockrider 800 is our new comfortable and versatile model.", "https://contents.mediadecathlon.com/p2089429/bf8738ae5d33531d990f411f1ecebaa3786eee55501c90caa64f69774f9a48ce/velo-de-montagne-rockrider-st500-26po-enfants.jpg");
var Bike7 = veloFactory("Rockrider 800 max pro", 1080, "The Rockrider 800 is our new comfortable and versatile model.", "https://contents.mediadecathlon.com/p1653608/k$f9547212b7d2fa0dcbfc6103ebf83086/sq/BICICLETA+DE+MONTA+A+DOBLE+SUSPENSI+N+ROCKRIDER+ST+520+S+27+5+24V+GRIS.jpg");
var Bike8 = veloFactory("Rockrider 100X", 1150, "The Rockrider 800 is our new comfortable and versatile model.", "https://contents.mediadecathlon.com/p1863838/k$75485953b89b3ecd693deeb44a9055da/sq/velo-vtt-st-900-s-gris-jaune-275.jpg?format=auto&f=969x969");

var velos = [Bike1, Bike2, Bike3, Bike4, Bike5, Bike6, Bike7, Bike8];
$(document).ready(function() {
    var cart = [];  // Cart array to hold items

    // Function to show bike cards
    function renderBikes(bikes) {
        $(".bike").empty();  // Clear previous cards
        bikes.forEach(function(bike) {
            $(".bike").append(`
                <div class="card">
                    <img src="${bike.image}" alt="${bike.name}">
                    <div class="card-content">
                        <h2>${bike.name}</h2>
                        <p class="price">${bike.price} DT</p>
                        <p>${bike.description}</p>
                    </div>
                    <button class="add-to-cart" data-bike='${JSON.stringify(bike)}'><i class="fas fa-cart-plus"></i></button>
                </div>
            `);
        });
    }

    //  execute function
    renderBikes(velos);

    // Add item to cart
    $(".bike").on("click", ".add-to-cart", function() {
        var bike = JSON.parse($(this).attr('data-bike'));
        cart.push(bike);
        updateCartCount();
    });

    // Update cart count display
    function updateCartCount() {
        $("#cart-count").text(cart.length);
    }

    // Open cart modal
    $('#cart-icon').click(function() {
        $('#cart-modal').show();
        displayCartItems();
    });

    // Close cart modal
    $('#close-modal, #close-cart').click(function() {
        $('#cart-modal').hide();
    });

    // Display cart items in modal
    function displayCartItems() {
        $('#cart-items').empty();
        var totalAmount = 0;
        cart.forEach(function(bike, index) {
            $('#cart-items').append(`
                <div class="cart-item" data-index="${index}">
                    <img src="${bike.image}" alt="${bike.name}">
                    <p>${bike.name} - ${bike.price} DT</p>
                    <button class="remove-from-cart"><i class="fas fa-trash"></i> Remove</button>
                </div>
            `);
            totalAmount += bike.price;
        });
        $('#total-amount').text(`Total: ${totalAmount} DT`);
    }

    // Remove item from cart
    $('#cart-items').on('click', '.remove-from-cart', function() {
        var itemIndex = $(this).closest('.cart-item').data('index');
        cart.splice(itemIndex, 1);  // Remove the item from the cart array
        updateCartCount();  // Update the cart count
        displayCartItems();  // Re-render the cart items
    });

    // Search functionality
    $('#search-bar').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();
        var filteredBikes = velos.filter(function(bike) {
            return bike.name.toLowerCase().includes(searchTerm) || 
                   bike.description.toLowerCase().includes(searchTerm) || 
                   bike.price.toString().includes(searchTerm);
        });
        renderBikes(filteredBikes);
    });

    // Price filter functionality
    $('#filter-price').click(function() {
        var minPrice = parseFloat($('#min-price').val()) || 0;
        var maxPrice = parseFloat($('#max-price').val()) || Infinity;

        var filteredBikes = velos.filter(function(bike) {
            return bike.price >= minPrice && bike.price <= maxPrice;
        });
        
        renderBikes(filteredBikes);
    });
});
