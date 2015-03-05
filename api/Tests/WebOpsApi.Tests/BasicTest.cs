using ApprovalTests;
using ApprovalTests.Reporters;
using NUnit.Framework;

namespace WebOpsApi.Tests
{
	[TestFixture]
	[UseReporter(typeof(DiffReporter))]
	public class BasicTest
	{
		[Test]
		public void ABasicTest()
		{
			var expected = "World";

			Approvals.Verify(expected);
		}

	}
}
