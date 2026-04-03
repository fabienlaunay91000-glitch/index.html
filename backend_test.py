import requests
import sys
from datetime import datetime
import json

class RetirementAPITester:
    def __init__(self, base_url="https://retraite-simple.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            print(f"   Status: {response.status_code}")
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "",
            200
        )
        if success and 'message' in response:
            print(f"   Message: {response['message']}")
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "0123456789",
            "message": "Test message for retirement analysis"
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success:
            print(f"   Contact ID: {response.get('id', 'N/A')}")
            print(f"   Name: {response.get('name', 'N/A')}")
            print(f"   Email: {response.get('email', 'N/A')}")
        
        return success

    def test_retirement_simulator(self):
        """Test retirement simulator"""
        test_scenarios = [
            {
                "name": "Young Professional",
                "data": {"age": 30, "years_contributed": 8, "average_income": 35000}
            },
            {
                "name": "Mid-Career",
                "data": {"age": 45, "years_contributed": 20, "average_income": 45000}
            },
            {
                "name": "Near Retirement",
                "data": {"age": 60, "years_contributed": 35, "average_income": 50000}
            }
        ]
        
        all_passed = True
        for scenario in test_scenarios:
            success, response = self.run_test(
                f"Simulator - {scenario['name']}",
                "POST",
                "simulate",
                200,
                data=scenario['data']
            )
            
            if success:
                print(f"   Monthly: {response.get('estimated_monthly', 'N/A')}€")
                print(f"   Yearly: {response.get('estimated_yearly', 'N/A')}€")
                print(f"   Trimestres: {response.get('trimestres_acquired', 'N/A')}/{response.get('trimestres_needed', 'N/A')}")
                print(f"   Message: {response.get('message', 'N/A')[:50]}...")
            else:
                all_passed = False
        
        return all_passed

    def test_articles_list(self):
        """Test articles list endpoint"""
        success, response = self.run_test(
            "Articles List",
            "GET",
            "articles",
            200
        )
        
        if success:
            articles_count = len(response) if isinstance(response, list) else 0
            print(f"   Articles found: {articles_count}")
            
            if articles_count >= 13:
                print("✅ Found expected 13+ articles")
                # Check first article structure
                if articles_count > 0:
                    first_article = response[0]
                    required_fields = ['id', 'slug', 'title', 'excerpt', 'content', 'read_time', 'date', 'category']
                    missing_fields = [field for field in required_fields if field not in first_article]
                    if missing_fields:
                        print(f"⚠️  Missing fields in article: {missing_fields}")
                    else:
                        print("✅ Article structure is complete")
            else:
                print(f"⚠️  Expected 13+ articles, found {articles_count}")
        
        return success

    def test_specific_article(self):
        """Test specific article endpoint"""
        # Test with known article slug
        test_slug = "comment-lire-son-releve-de-carriere"
        
        success, response = self.run_test(
            f"Specific Article - {test_slug}",
            "GET",
            f"articles/{test_slug}",
            200
        )
        
        if success:
            print(f"   Title: {response.get('title', 'N/A')}")
            print(f"   Category: {response.get('category', 'N/A')}")
            print(f"   Read time: {response.get('read_time', 'N/A')} min")
        
        return success

    def test_nonexistent_article(self):
        """Test nonexistent article returns 404"""
        success, response = self.run_test(
            "Nonexistent Article",
            "GET",
            "articles/nonexistent-article-slug",
            404
        )
        return success

    def test_contact_retrieval(self):
        """Test contact retrieval (if endpoint exists)"""
        success, response = self.run_test(
            "Contact Retrieval",
            "GET",
            "contacts",
            200
        )
        
        if success:
            contacts_count = len(response) if isinstance(response, list) else 0
            print(f"   Contacts found: {contacts_count}")
        
        return success

def main():
    print("🚀 Starting French Retirement Analysis API Tests")
    print("=" * 60)
    
    tester = RetirementAPITester()
    
    # Run all tests
    tests = [
        tester.test_api_root,
        tester.test_contact_submission,
        tester.test_retirement_simulator,
        tester.test_articles_list,
        tester.test_specific_article,
        tester.test_nonexistent_article,
        tester.test_contact_retrieval
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.failed_tests.append({
                "test": test.__name__,
                "error": str(e)
            })
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"📊 Test Summary:")
    print(f"   Tests run: {tester.tests_run}")
    print(f"   Tests passed: {tester.tests_passed}")
    print(f"   Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure.get('test', 'Unknown')}: {failure.get('error', failure.get('response', 'Unknown error'))}")
    
    # Return exit code
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())