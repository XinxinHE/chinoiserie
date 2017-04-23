describe('Controller: MenuController', function(){
  //load the controller module
  beforeEach(module('confusionApp'));

  var MenuController, scope, $httpBackend;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('views/header.html').respond(200, '');
  }));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('views/home.html').respond(200, '');
  }));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('views/footer.html').respond(200, '');
  }));

  beforeEach(inject(function($controller, _$httpBackend_, $rootScope, menuFactory){

    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET("http://localhost:3000/dishes").respond([
      {
        "id": 0,
        "name": "Uthapizza",
        "image": "images/Uthapizza.png",
        "category": "mains",
        "label": "New",
        "price": "4.99",
        "description": "A",
        "comments":[{}]
      },
      {
        "id": 1,
        "name": "Zucchipakoda",
        "image": "images/zuccipakoda.png",
        "category": "mains",
        "label": "New",
        "price": "4.99",
        "description": "A",
        "comments":[{}]
      }
    ]);

    scope = $rootScope.$new();
    MenuController = $controller('MenuController', {
      $scope: scope, menuFactory: menuFactory
    });

    $httpBackend.flush();

  }));

  it('should have showDetails as false', function(){
    expect(scope.showDetails).toBeFalsy();
  });

  it('should create "dishes" with 2 dishes fetched from xhr', function(){
    expect(scope.showMenu).toBeTruthy();
    expect(scope.dishes).toBeDefined();
    expect(scope.dishes.length).toBe(2);
  });

  it('should have the correct data order in the dishes', function(){
    expect(scope.dishes[0].name).toBe("Uthapizza");
    expect(scope.dishes[0].label).toBe("New");
  });

  it('should change the tab selected based on tab clicked', function(){
    expect(scope.tab).toEqual(1);
    scope.select(3);

    expect(scope.tab).toEqual(3);
    expect(scope.filtText).toEqual('mains');
  });
});
